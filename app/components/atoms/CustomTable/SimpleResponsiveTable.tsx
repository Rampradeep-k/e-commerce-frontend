import React from 'react';
import { Table, Card, Row, Col, Space, Grid } from 'antd';

const { useBreakpoint } = Grid;

interface Props {
  data: any[];
  columns: any[];
  title?: string;
}

const SimpleResponsiveTable = ({ data, columns, title }: Props) => {
  const screens = useBreakpoint();
  const isMobile = !screens.md; // auto responsive

  /* ---------------- DESKTOP TABLE ---------------- */
  if (!isMobile) {
    return (
      <Table
      title={title ? () => <Space>{title}</Space> : undefined}
        dataSource={data}
        columns={columns}
        rowKey="id"
        scroll={{ x: 800 }}
        pagination={{ pageSize: 10 }}
      />
    );
  }

  /* ---------------- MOBILE CARD VIEW ---------------- */
  return (
    <Row gutter={[16, 16]}>
      {data.map((record) => (
        <Col xs={24} key={record.id}>
          <Card size="small" hoverable>

            {/* Normal fields */}
            {columns
              .filter(
                (col) =>
                  col.dataIndex &&
                  col.cardView?.visible !== false
              )
              .map((col) => (
                <div key={col.key} style={{ marginBottom: 8 }}>
                  <strong>{col.title}:</strong>{' '}
                  {col.render
                    ? col.render(record[col.dataIndex], record)
                    : record[col.dataIndex]}
                </div>
              ))}

            {/* Action column (AUTO) */}
            {columns
              .filter((col) => !col.dataIndex && col.render)
              .map((col) => (
                <div
                  key={col.key}
                  style={{ marginTop: 12, textAlign: 'right' }}
                >
                  {col.render(null, record)}
                </div>
              ))}

          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default SimpleResponsiveTable;
