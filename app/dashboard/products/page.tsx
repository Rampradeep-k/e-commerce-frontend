'use client';

import { Button, Input, Space, Form, Upload, Image, Modal, Descriptions, Rate, List, Card, Typography, Divider } from "antd";
import { useEffect, useRef, useState } from "react";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined, StarOutlined, CommentOutlined } from "@ant-design/icons";
import ShowAlert from "@/app/components/atoms/Alert/page";
import Loader from "@/app/components/atoms/Loading/page";
import SimpleResponsiveTable from "@/app/components/atoms/CustomTable/SimpleResponsiveTable";
import Modalview from "@/app/components/atoms/Modalview/page";
import { ApiCallDelete, ApiCallGEt, ApiCallPOST, ApiCallPut } from "@/app/api/api-content";
import Checkbox from "antd/es/checkbox/Checkbox";

const { TextArea } = Input;
const { Title, Text } = Typography;

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

interface Review {
  productId: number;
  rating: number;
  description: string;
  reviewId?: number;
  createdAt?: string;
}

export default function DashboardPage() {
  const [itemlist, setItemList] = useState<User[]>([]);
  const [createModule, setCreateModule] = useState<boolean>(false);
  const [viewModule, setViewModule] = useState<boolean>(false);
  const [reviewModule, setReviewModule] = useState<boolean>(false);
  const [viewReviewsModule, setViewReviewsModule] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<User | null>(null);
  const [loaderModule, setLoaderModule] = useState<boolean>(false);
  const [editData, setEditData] = useState<UserFormData | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [form] = Form.useForm();
  const [reviewForm] = Form.useForm();
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
      console.error("Error fetching products:", error);
      ShowAlert({
        title: 'Error',
        description: 'Failed to load Products',
        type: 'error',
      });
      setLoaderModule(false);
    }
  };

  const fetchReviews = async (productId: number) => {
    try {
      setLoaderModule(true);
      const data = await ApiCallGEt({ productId: productId }, `/product-review`);
      setReviews(data?.data || []);
      setLoaderModule(false);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
      setLoaderModule(false);
    }
  };

  const handleView = (record: User) => {
    setSelectedProduct(record);
    setViewModule(true);
  };

  const handleEdit = (record: User) => {
    form.resetFields();

    form.setFieldsValue({
      productName: record.productName,
      description: record.description || '',
      price: record.price,
      sku: record.sku || '',
      availability: record.availability || false,
      images: Array.isArray(record.images) ? record.images[0] : record.images || '',
    });

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
      fetchUsers();
    } catch (error) {
      ShowAlert({
        title: 'Error',
        description: 'Failed to delete product',
        type: 'error',
      });
    }
  };

  const handleAddProduct = () => {
    form.resetFields();
    setImageUrl("");
    setEditData(null);
    setCreateModule(true);
  };

  const handleAddReview = (product: User) => {
    setSelectedProduct(product);
    reviewForm.resetFields();
    setReviewModule(true);
  };

  const handleViewReviews = async (product: User) => {
    setSelectedProduct(product);
    await fetchReviews(product.productId);
    setViewReviewsModule(true);
  };

  const onSubmitReview = async (values: { rating: number; description: string }) => {
    try {
      setLoaderModule(true);
      const payload = {
        productId: selectedProduct?.productId,
        rating: values.rating,
        description: values.description
      };

      await ApiCallPOST(payload, '/product-review');
      ShowAlert({
        title: 'Success',
        description: 'Review added successfully',
        type: 'success',
      });
      setReviewModule(false);
      reviewForm.resetFields();
      setLoaderModule(false);
    } catch (error) {
      ShowAlert({
        title: 'Error',
        description: 'Failed to add review',
        type: 'error',
      });
      setLoaderModule(false);
    }
  };

  const onSubmit = async (values: UserFormData) => {
    try {
      setLoaderModule(true);

      const payload = {
        productName: values.productName,
        price: values.price,
        sku: values.sku,
        description: values.description,
        images: values.images,
        availability: values.availability || false
      };

      if (editData?.productId) {
        await ApiCallPut(payload, `/products/${editData.productId}`);
        ShowAlert({
          title: 'Updated Successfully',
          description: 'Product has been updated.',
          type: 'success',
        });
      } else {
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
      fetchUsers();
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
    setReviewModule(false);
    setViewReviewsModule(false);
    form.resetFields();
    reviewForm.resetFields();
    setImageUrl("");
    setEditData(null);
    setSelectedProduct(null);
    setReviews([]);
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
      width: 200,
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
          <CommentOutlined
            style={{ cursor: "pointer", color: "orange", fontSize: "20px" }}
            onClick={() => handleAddReview(record)}
          />
          <StarOutlined
            style={{ cursor: "pointer", color: "gold", fontSize: "20px" }}
            onClick={() => handleViewReviews(record)}
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
        <Form form={form} layout="vertical" onFinish={onSubmit}>
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
            <Input.TextArea placeholder="Enter description" rows={4} />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: 'Please enter price' },
              { pattern: /^\d+(\.\d+)?$/, message: 'Please enter a valid price' }
            ]}
          >
            <Input placeholder="Enter price" prefix="$" type="number" step="0.01" />
          </Form.Item>

          <Form.Item
            name="sku"
            label="SKU"
            rules={[{ required: true, message: 'Please enter SKU' }]}
          >
            <Input placeholder="Enter SKU" />
          </Form.Item>

          <Form.Item name="availability" valuePropName="checked" rules={[{ required: false }]}>
            <Checkbox>Available</Checkbox>
          </Form.Item>

          <Form.Item name="images" label="Product Image URL">
            <Input
              placeholder="Enter image URL (e.g., https://example.com/product-image.jpg)"
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </Form.Item>

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

      {/* Add Review Modal */}
      <Modal
        title={`Add Review for ${selectedProduct?.productName}`}
        open={reviewModule}
        onCancel={handleModalClose}
        footer={[
          <Button key="cancel" onClick={handleModalClose}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => reviewForm.submit()}>
            Submit Review
          </Button>
        ]}
        width={600}
      >
        <Form form={reviewForm} layout="vertical" onFinish={onSubmitReview}>
          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, message: 'Please select a rating' }]}
          >
            <Rate allowHalf style={{ fontSize: 24 }} />
          </Form.Item>

          <Form.Item
            name="description"
            label="Review Description"
            rules={[{ required: true, message: 'Please enter your review' }]}
          >
            <TextArea rows={4} placeholder="Write your review here..." />
          </Form.Item>
        </Form>
      </Modal>

      {/* View Reviews Modal */}
      <Modal
        title={`Reviews for ${selectedProduct?.productName}`}
        open={viewReviewsModule}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>
        ]}
        width={700}
      >
        {reviews.length > 0 ? (
          <List
            itemLayout="vertical"
            dataSource={reviews}
            renderItem={(review) => (
              <List.Item>
                <Card style={{ marginBottom: 16 }}>
                  <Space direction="vertical" size="middle">
                    <div>
                      <Rate disabled defaultValue={review.rating} />
                      <Text type="secondary" style={{ marginLeft: 8 }}>
                        Rating: {review.rating}/5
                      </Text>
                    </div>
                    <div>
                      <Text strong>Review: </Text>
                      <Text>{review.description}</Text>
                    </div>
                    {review.createdAt && (
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        Posted on: {new Date(review.createdAt).toLocaleDateString()}
                      </Text>
                    )}
                  </Space>
                </Card>
              </List.Item>
            )}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <StarOutlined style={{ fontSize: 48, color: '#ccc' }} />
            <Title level={4} style={{ marginTop: 16 }}>No Reviews Yet</Title>
            <Text type="secondary">Be the first to review this product!</Text>
          </div>
        )}
      </Modal>

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