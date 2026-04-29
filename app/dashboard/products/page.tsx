'use client';

import { Button, Input, Space, Form, Upload, Image, Modal, Descriptions } from "antd";
import { useEffect, useRef, useState } from "react";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import ShowAlert from "@/app/components/atoms/Alert/page";
import Loader from "@/app/components/atoms/Loading/page";
import SimpleResponsiveTable from "@/app/components/atoms/CustomTable/SimpleResponsiveTable";
import Modalview from "@/app/components/atoms/Modalview/page";
import { ApiCallDelete, ApiCallGEt, ApiCallPOST, ApiCallPut } from "@/app/api/api-content";
import Checkbox from "antd/es/checkbox/Checkbox";

interface User {
  productName: string;
  description: string;
  productId: number;
  price: number;
  sku: string;
  images?: string | string[];
  availability?: boolean;
}

interface UserFormData {
  productId?: number;
  productName: string;
  price: string | number;
  sku: string;
  description?: string;
  images?: any;
  availability?: boolean;
}

export default function DashboardPage() {
  const [itemlist, setItemList] = useState<User[]>([]);
  const [createModule, setCreateModule] = useState<boolean>(false);
  const [viewModule, setViewModule] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<User | null>(null);
  const [loaderModule, setLoaderModule] = useState<boolean>(false);
  const [editData, setEditData] = useState<UserFormData | null>(null);
  const [imageUrl, setImageUrl] = useState<string>(""); // For single image input
  const [form] = Form.useForm();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoaderModule(true);
      const data = await ApiCallGEt({ "isActive": true }, '/products');
      console.log(data?.data.data);
      setItemList(data?.data || []);
      setLoaderModule(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      ShowAlert({
        title: 'Error',
        description: 'Failed to load users',
        type: 'error',
      });
      setLoaderModule(false);
    }
  };

  const handleView = (record: User) => {
    setSelectedProduct(record);
    setViewModule(true);
  };

  const handleEdit = (record: User) => {
    // Reset form first
    form.resetFields();

    // Set form values for editing
    form.setFieldsValue({
      productName: record.productName,
      description: record.description || '',
      price: record.price,
      sku: record.sku || '',
      availability: record.availability || false,
      images: Array.isArray(record.images) ? record.images[0] : record.images || '', // Set first image URL
    });

    // Set image URL for editing
    setImageUrl(Array.isArray(record.images) ? record.images[0] : record.images || '');

    setEditData({
      productId: record.productId,
      images: record.images,
      productName: record.productName,
      description: record.description || '',
      price: record.price,
      sku: record.sku || '',
      availability: record.availability || false,
    });
    setCreateModule(true);
  };

  const handleDelete = async (productId: number) => {
    try {
      await ApiCallDelete({ productId }, `/products/${productId}`);
      ShowAlert({
        title: 'Deleted Successfully',
        description: 'Product has been deleted.',
        type: 'success',
      });
      fetchUsers(); // Refresh the list
    } catch (error) {
      ShowAlert({
        title: 'Error',
        description: 'Failed to delete product',
        type: 'error',
      });
    }
  };

  const handleAddProduct = () => {
    // Reset form completely
    form.resetFields();
    // Reset image URL
    setImageUrl("");
    // Reset edit data
    setEditData(null);
    // Open modal
    setCreateModule(true);
  };

  const onSubmit = async (values: UserFormData) => {
    try {
      setLoaderModule(true);

      // Handle image - get the URL from form or state
     
      const payload = {
        productName: values.productName,
        price: values.price,
        sku: values.sku,
        description: values.description,
        images: values.images, // Send as array of URLs
        availability: values.availability || false
      };

      if (editData?.productId) {
        // Update existing product
        await ApiCallPut(payload, `/products/${editData.productId}`);
        ShowAlert({
          title: 'Updated Successfully',
          description: 'Product has been updated.',
          type: 'success',
        });
      } else {
        // Create new product
        await ApiCallPOST(payload, '/products');
        ShowAlert({
          title: 'Created Successfully',
          description: 'Product has been created.',
          type: 'success',
        });
      }

      setLoaderModule(false);
      setCreateModule(false);
      setImageUrl("");
      form.resetFields();
      setEditData(null);
      fetchUsers(); // Refresh the list
    } catch (error) {
      console.error("Error:", error);
      ShowAlert({
        title: 'Error',
        description: editData?.productId ? 'Failed to update product' : 'Failed to create product',
        type: 'error',
      });
      setLoaderModule(false);
    }
  };

  const handleModalClose = () => {
    setCreateModule(false);
    setViewModule(false);
    form.resetFields();
    setImageUrl("");
    setEditData(null);
    setSelectedProduct(null);
  };

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'productName',
      key: 'productName',
      width: 150,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 120,
      render: (price: number) => `$${price}`,
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      width: 150,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 200,
      ellipsis: true,
    },
    {
      title: 'Availability',
      dataIndex: 'availability',
      key: 'availability',
      width: 120,
      render: (availability: boolean) => (
        <span style={{
          color: availability ? 'green' : 'red',
          fontWeight: 'bold'
        }}>
          {availability ? "Available" : "Out of Stock"}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 150,
      render: (_: any, record: User) => (
        <div style={{ display: 'flex', gap: 12 }}>
          <EyeOutlined
            style={{ cursor: "pointer", color: "blue", fontSize: "20px" }}
            onClick={() => handleView(record)}
          />
          <EditOutlined
            style={{ cursor: "pointer", color: "green", fontSize: "20px" }}
            onClick={() => handleEdit(record)}
          />
          <DeleteOutlined
            style={{ cursor: "pointer", color: "red", fontSize: "20px" }}
            onClick={() => handleDelete(record.productId)}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Loader spinning={loaderModule} />
      <div style={{ display: "flex", margin: "10px", justifyContent: "end" }}>
        <Button type="primary" onClick={handleAddProduct}>
          Add Product
        </Button>
      </div>

      <SimpleResponsiveTable
        title="Product List"
        data={itemlist}
        columns={columns}
      />

      {/* Create/Edit Product Modal */}
      <Modalview
        open={createModule}
        title={editData?.productId ? "Edit Product" : "Create Product"}
        okText={editData?.productId ? "Update" : "Create"}
        cancelText="Close"
        onOk={() => form.submit()}
        onCancel={handleModalClose}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onSubmit}
        >
          <Form.Item
            name="productName"
            label="Product Name"
            rules={[{ required: true, message: 'Please enter product name' }]}
          >
            <Input placeholder="Enter product name" size="large" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <Input.TextArea
              placeholder="Enter description"
              rows={4}
            />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: 'Please enter price' },
              { pattern: /^\d+(\.\d+)?$/, message: 'Please enter a valid price' }
            ]}
          >
            <Input
              placeholder="Enter price"
              prefix="$"
              type="number"
              step="0.01"
            />
          </Form.Item>

          <Form.Item
            name="sku"
            label="SKU"
            rules={[{ required: true, message: 'Please enter SKU' }]}
          >
            <Input placeholder="Enter SKU" />
          </Form.Item>

          <Form.Item
            name="availability"
            valuePropName="checked"
            rules={[{ required: false }]}
          >
            <Checkbox>Available</Checkbox>
          </Form.Item>

          <Form.Item
            name="images"
            label="Product Image URL"
            // rules={[{ required: false, type: 'url', message: 'Please enter a valid URL' }]}
          >
            <Input 
              placeholder="Enter image URL (e.g., https://example.com/product-image.jpg)"
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </Form.Item>

          {/* Image Preview */}
          {form.getFieldValue('images') && (
            <Form.Item label="Image Preview">
              <Image
                src={form.getFieldValue('images')}
                alt="Product preview"
                width={200}
                height={200}
                style={{ objectFit: 'cover' }}
                fallback="https://via.placeholder.com/200?text=Invalid+Image+URL"
              />
            </Form.Item>
          )}
        </Form>
      </Modalview>

      {/* View Product Modal */}
      <Modal
        title="Product Details"
        open={viewModule}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>
        ]}
        width={700}
      >
        {selectedProduct && (
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Product Name">
              {selectedProduct.productName}
            </Descriptions.Item>

            <Descriptions.Item label="SKU">
              {selectedProduct.sku}
            </Descriptions.Item>

            <Descriptions.Item label="Price">
              ${selectedProduct.price}
            </Descriptions.Item>

            <Descriptions.Item label="Availability">
              <span style={{
                color: selectedProduct.availability ? 'green' : 'red',
                fontWeight: 'bold'
              }}>
                {selectedProduct.availability ? "Available" : "Out of Stock"}
              </span>
            </Descriptions.Item>

            <Descriptions.Item label="Description">
              {selectedProduct.description}
            </Descriptions.Item>

            {selectedProduct.images && (
              <Descriptions.Item label="Product Image">
                <Image
                  src={Array.isArray(selectedProduct.images) ? selectedProduct.images[0] : selectedProduct.images}
                  alt={selectedProduct.productName}
                  width={300}
                  height={300}
                  style={{ objectFit: 'cover' }}
                  fallback="https://via.placeholder.com/300?text=No+Image"
                />
              </Descriptions.Item>
            )}
          </Descriptions>
        )}
      </Modal>
    </div>
  );
}