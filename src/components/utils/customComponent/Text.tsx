
interface TextProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
    font: "small" | "medium" | "long",
    paragraph?: boolean,
    classname?: string,
    children: React.ReactNode,
}

const Text = (props: TextProps) => {
    const { paragraph, font, children, className, ...rest } = props;
    if (paragraph) {
        return (
            <p>{children}</p>
        )
    }
    return (
        <h2 {...rest} className={`${font === "long" ? "text-lg md:text-xl font-extrabold" :
            font === "medium" ? "text-sm md:text-base font-bold" :
                "text-xs md:text-sm font-medium"} ${className}`}>{children}</h2>
    )
}

export default Text;