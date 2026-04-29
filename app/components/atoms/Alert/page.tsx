'use client';

import { notification } from 'antd';

type AlertType = 'success' | 'info' | 'warning' | 'error';

function ShowAlert({
  title,
  description,
  type,
}: {
  title: string;
  description?: string;
  type: AlertType;
}) {
  if (typeof window === 'undefined') return; // SSR guard

  notification[type]({
    title,
    description,
    placement: 'topRight',
    duration: 3, // auto close (seconds)
  });
}

export default ShowAlert;
