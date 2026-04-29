'use client';

import { Spin, ConfigProvider } from 'antd';
import type { SpinProps } from 'antd';
import { createStaticStyles } from 'antd-style';

const Loader = ({ spinning }: { spinning: boolean }) => {

    const stylesObject: SpinProps['styles'] = {
  indicator: {
    color: '#00d4ff',
  },
};

    return (
        <ConfigProvider
            theme={{
                token: {
                    zIndexPopupBase: 3000, // 👈 affects Spin mask
                },
            }}
        >
            <Spin
                spinning={spinning}
                fullscreen
                size="large"
                styles={stylesObject} 
            />
        </ConfigProvider>
    );
};

export default Loader;
