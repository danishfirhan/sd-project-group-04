// app/admin/events/[id]/layout.tsx
import React from 'react';
import { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';

export const metadata: Metadata = {
    title: `Update Event - ${APP_NAME}`,
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
};

export default Layout;