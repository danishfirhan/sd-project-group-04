'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

const ReloadButton = () => {
const [refresh, setRefresh] = useState(false)
return (
<Button
    onClick={() => setRefresh(!refresh)}
    variant="default"
    className="w-full"
>
    View Product
</Button>
)
}

export default ReloadButton
