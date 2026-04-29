'use client';

import { Modal } from 'antd';
import React from 'react';

interface ModalviewProps {
    open: boolean;
    title: string;
    okText?: string;
    cancelText?: string;
    onOk?: () => void;
    onCancel?: () => void;
    width?: number;
    children: React.ReactNode;
}

const Modalview = ({
    open,
    title,
    okText = 'Submit',
    cancelText = 'Cancel',
    onOk,
    onCancel,
    width = 520,
    children,
}: ModalviewProps) => {
    return (
        <Modal
            open={open}
            title={title}
            okText={okText}
            cancelText={cancelText}
            onOk={onOk}
            onCancel={onCancel}
            width={width}
            // destroyOnClose
            centered
        >
            {children}
        </Modal>
    );
};

export default Modalview;
