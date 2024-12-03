import * as SolidIcons from '@heroicons/react/24/solid';
import * as OutlineIcons from '@heroicons/react/24/outline';
import { SVGProps } from 'preact/compat';

export type IconName = keyof typeof SolidIcons | keyof typeof OutlineIcons;

type HeroIconProps = {
    solid?: boolean;
    iconName: IconName;
    className?: any;
    title?: any;
} & Omit<SVGProps<SVGSVGElement>, 'ref'>;

export function HeroIcon(props: HeroIconProps) {
    const { solid, iconName, className, title, ...rest } = props;

    // Resolve signal-like values
    const resolvedProps = Object.fromEntries(
        Object.entries(rest).map(([key, value]) => [
            key,
            value && typeof value === 'object' && 'value' in value ? value.value : value,
        ])
    );

    const resolvedClassName = className?.value ?? className ?? 'h-6 w-6';
    const resolvedTitle = title?.value ?? title ?? '';

    const Icon = solid ? SolidIcons[iconName] : OutlineIcons[iconName];

    if (!Icon) {
        throw new Error(`Icon "${iconName}" not found in ${solid ? 'solid' : 'outline'} icons.`);
    }

    return (
        <Icon
            className={resolvedClassName}
            title={resolvedTitle}
            {...resolvedProps}
        />
    );
}

