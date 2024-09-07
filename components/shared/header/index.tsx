import Image from 'next/image';
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import Menu from './menu';

const Header = async () => {
return (
<header className="w-full border-b">
    <div className="wrapper flex-between">
    <div className="flex-start">
        <Link href="/" className="flex items-center space-x-2">
        <Image
            src="/assets/icons/logo.svg"
            width={48}
            height={48}
            alt={`${APP_NAME} logo`}
        />
        <span className="font-bold text-xl">{APP_NAME}</span>
        </Link>
    </div>
    <Menu />
    </div>
</header>
);
};

export default Header;
