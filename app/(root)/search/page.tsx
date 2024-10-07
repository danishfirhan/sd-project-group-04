import Pagination from '@/components/shared/pagination'
import ProductCard from '@/components/shared/product/product-card'
import { Button } from '@/components/ui/button'
import { getAllCategories, getAllProducts } from '@/lib/actions/product.actions'
import { APP_NAME } from '@/lib/constants'
import Link from 'next/link'

const sortOrders = ['newest', 'lowest', 'highest', 'rating']

// Updated prices array with RM currency
const prices = [
{
name: 'RM1 to RM100',
value: '1-100',
},
{
name: 'RM101 to RM200',
value: '101-200',
},
{
name: 'RM201 to RM1000',
value: '201-1000',
},
]

const ratings = [4, 3, 2, 1]

export async function generateMetadata({
searchParams: { q = 'all', category = 'all', price = 'all', rating = 'all' },
}: {
searchParams: {
q: string
category: string
price: string
rating: string
sort: string
page: string
}
}) {
if (
(q !== 'all' && q !== '') ||
category !== 'all' ||
rating !== 'all' ||
price !== 'all'
) {
return {
    title: `Search ${q !== 'all' ? q : ''}
            ${category !== 'all' ? ` : Category ${category}` : ''}
            ${price !== 'all' ? ` : Price ${price}` : ''}
            ${rating !== 'all' ? ` : Rating ${rating}` : ''} - ${APP_NAME}`,
}
} else {
return {
    title: `Search Products - ${APP_NAME}`,
}
}
}

export default async function SearchPage({
searchParams: {
q = 'all',
category = 'all',
price = 'all',
rating = 'all',
sort = 'newest',
page = '1',
},
}: {
searchParams: {
q: string
category: string
price: string
rating: string
sort: string
page: string
}
}) {
const getFilterUrl = ({
c,
s,
p,
r,
pg,
}: {
c?: string
s?: string
p?: string
r?: string
pg?: string
}) => {
const params = { q, category, price, rating, sort, page }
if (c) params.category = c
if (p) params.price = p
if (r) params.rating = r
if (pg) params.page = pg
if (s) params.sort = s
return `/search?${new URLSearchParams(params).toString()}`
}

const categories = await getAllCategories()
const products = await getAllProducts({
category,
query: q,
price,
rating,
page: Number(page),
sort,
})

return (
<div className="grid md:grid-cols-5 md:gap-5">
    <div>
    {/* Updated Sidebar Styles with Margin Between Sections */}
    <div className="text-2xl font-bold pt-3 border-b pb-2">Category</div>
    <div className="mt-3">
        <ul>
        <li className="mb-2">
            <Link
            className={`${
                ('all' === category || '' === category) && 'text-primary'
            }`}
            href={getFilterUrl({ c: 'all' })}
            >
            Any
            </Link>
        </li>
        {categories.map((c: { name: string }) => (
            <li key={c.name} className="mb-2">
            <Link
                className={`${c.name === category && 'text-primary'}`}
                href={getFilterUrl({ c: c.name })}
            >
                {c.name}
            </Link>
            </li>
        ))}
        </ul>
    </div>

    {/* Price Section with Margin */}
    <div className="text-2xl font-bold pt-3 border-b pb-2 mt-6">Price</div>
    <ul className="mt-3">
        <li className="mb-2">
        <Link
            className={`  ${'all' === price && 'text-primary'}`}
            href={getFilterUrl({ p: 'all' })}
        >
            Any
        </Link>
        </li>
        {prices.map((p) => (
        <li key={p.value} className="mb-2">
            <Link
            href={getFilterUrl({ p: p.value })}
            className={`  ${p.value === price && 'text-primary'}`}
            >
            {p.name}
            </Link>
        </li>
        ))}
    </ul>

    {/* Customer Review Section with Margin */}
    <div className="text-2xl font-bold pt-3 border-b pb-2 mt-6">
        Customer Review
    </div>
    <ul className="mt-3">
        <li className="mb-2">
        <Link
            href={getFilterUrl({ r: 'all' })}
            className={`  ${'all' === rating && 'text-primary'}`}
        >
            Any
        </Link>
        </li>
        {ratings.map((r) => (
        <li key={r} className="mb-2">
            <Link
            href={getFilterUrl({ r: `${r}` })}
            className={`${r.toString() === rating && 'text-primary'}`}
            >
            {`${r} stars & up`}
            </Link>
        </li>
        ))}
    </ul>
    </div>

    <div className="md:col-span-4 space-y-4">
    <div className="flex-between flex-col md:flex-row my-4">
        <div className="flex items-center">
        {q !== 'all' && q !== '' && 'Query : ' + q}
        {category !== 'all' && category !== '' && '   Category : ' + category}
        {price !== 'all' && '    Price: ' + price}
        {rating !== 'all' && '    Rating: ' + rating + ' & up'}
        &nbsp;
        {(q !== 'all' && q !== '') ||
        (category !== 'all' && category !== '') ||
        rating !== 'all' ||
        price !== 'all' ? (
            <Button variant={'link'} asChild>
            <Link href="/search">Clear</Link>
            </Button>
        ) : null}
        </div>
        <div>
        Sort by{' '}
        {sortOrders.map((s) => (
            <Link
            key={s}
            className={`mx-2   ${sort == s && 'text-primary'} `}
            href={getFilterUrl({ s })}
            >
            {s}
            </Link>
        ))}
        </div>
    </div>

    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {products!.data.length === 0 && <div>No product found</div>}
        {products!.data.map((product) => (
        <ProductCard key={product.id} product={product} />
        ))}
    </div>

    {products!.totalPages! > 1 && (
        <Pagination page={page} totalPages={products!.totalPages} />
    )}
    </div>
</div>
)
}
