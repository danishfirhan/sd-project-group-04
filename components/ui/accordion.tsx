import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils'; // Utility function for conditional classes

const Accordion = AccordionPrimitive.Root;
const AccordionItem = AccordionPrimitive.Item;
const AccordionTrigger = AccordionPrimitive.Trigger;
const AccordionContent = AccordionPrimitive.Content;

export const AccordionComponent = ({
items,
}: {
items: { question: string; answer: string }[];
}) => {
return (
<Accordion type="single" collapsible className="space-y-2">
    {items.map((item, index) => (
    <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg">
        <AccordionTrigger
        className={cn(
            'flex w-full justify-between items-center p-4 transition-colors duration-200',
            'bg-white text-black hover:bg-orange-500 dark:bg-gray-800 dark:text-white',
            'dark:hover:bg-orange-500 dark:hover:text-white',
            'data-[state=open]:bg-orange-500 data-[state=open]:text-white',
            'dark:data-[state=open]:bg-orange-500 dark:data-[state=open]:text-white'
        )}
        >
        {item.question}
        <ChevronDownIcon className="ml-2 transition-transform duration-200" />
        </AccordionTrigger>
        <AccordionContent
        className={cn(
            'p-4 bg-white dark:bg-gray-900 border-t dark:border-gray-700 text-black dark:text-white',
            'data-[state=open]:bg-orange-700 data-[state=open]:text-white', // Change background to dark orange when open
            'dark:data-[state=open]:bg-orange-700 dark:data-[state=open]:text-white' // Dark orange background with white text in dark mode
        )}
        >
        {item.answer}
        </AccordionContent>
    </AccordionItem>
    ))}
</Accordion>
);
};
