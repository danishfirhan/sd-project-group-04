// components/shared/event/event-price.tsx
import { cn } from '@/lib/utils';

    const EventPrice = ({ value, className }: { value: number; className?: string }) => {
    const stringValue = value.toString();
    const [intValue, floatValue] = stringValue.includes('.')
        ? stringValue.split('.')
        : [stringValue, ''];
    
    return (
        <p className={cn('text-2xl', className)}>
        <span className="text-xs align-super">RM</span>
        {intValue}
        <span className="text-xs align-super">{floatValue}</span>
        </p>
    );
    };

export default EventPrice;