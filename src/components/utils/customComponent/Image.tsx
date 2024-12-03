import React from "react";
import styled from "styled-components";

type ImageProps = {
    classname?: string;
    alt?: string; // Make alt optional
    src: string; // Add src as a required property
} & React.HTMLAttributes<HTMLImageElement>;

const Image = (props: ImageProps) => {
    const { classname, alt = "image" } = props; // Default alt if none provided
    return (
        <ImageComp 
            {...props} 
            alt={alt} 
            className={`object-contain ${classname}`} 
            decoding="async" 
        />
    );
};

const ImageComp = styled.img`
    max-height: 100%;
    max-width: 100%;
    width: 40px;
`;

export default Image;
