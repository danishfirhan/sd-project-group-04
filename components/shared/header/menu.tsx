import Link from 'next/link'
import UserButton from './user-button'
import CartButton from './cart-button'

const Menu = () => {
    return (
        <div className="flex justify-end gap-3">
            <nav className="md:flex hidden w-full max-w-xs gap-1">
            <Link href="/about-us" className="p-2 whitespace-nowrap">
                    About Us
                </Link>
                <Link href="/contact-us" className="p-2 whitespace-nowrap">
                    Contact Us
                </Link>
                <CartButton/>
                <UserButton />
            </nav>
        </div>
    )
}

export default Menu
