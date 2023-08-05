'use client';

import { FC, useEffect, useState } from 'react'
import { CldUploadButton } from 'next-cloudinary';

interface ImageUploadProps {
    value: string;
    onChange: (src: string) => void;
    disabled?: boolean;
}

const ImageUpload: FC<ImageUploadProps> = ({
    onChange,
    value,
    disabled
}) => {

    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className='flex flex-col items-center justify-center w-full space-y-4'>
            <CldUploadButton
                options={{
                    maxFiles: 1
                }}>

            </CldUploadButton>
        </div>
    )
}

export default ImageUpload