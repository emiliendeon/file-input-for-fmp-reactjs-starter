import React, { useEffect, useState } from "react";
import styled from "styled-components";

import colors from "../../themes/colors.theme";
import Text from "../style/text.component";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    background-color: ${colors.dark};

    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 14px;
        opacity: 0.7;
    }
`;

const InputWrapper = styled.label`
    position: relative;
    display: flex;
    flex-direction: column;
    cursor: pointer;
`;

const Label = styled(Text)`
    margin-bottom: 20px;
    font-size: 16px;
`;

const Input = styled.input`
    position: absolute;
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    height: 1px;
    width: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
`;

const Button = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 28px;
    background-color: ${colors.primary};
    font-size: 12px;
    color: ${colors.light};
    border-radius: 14px;

    &:not(:first-of-type) {
        margin-top: 10px;
    }
`;

const Files = styled.div`
    display: flex;
    flex-direction: column;
`;

const File = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    height: 28px;
    padding: 0 10px;
    background-color: ${colors.light};
    border: 1px solid ${colors.primary};
    border-radius: 14px;

    &:not(:first-child) {
        margin-top: 10px;
    }
`;

const FileLabel = styled(Text)`
    font-size: 12px;
    color: ${colors.dark};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const DeleteIconWrapper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 28px;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const DeleteIcon = styled.div`
    display: flex;
    flex-direction: column;
    width: 16px;
    height: 16px;
    background: center / contain no-repeat url("/assets/icons/remove-file.png");
`;

type FileInputProps = {
    label?: string;
    multiple?: boolean;
    onChange: (files: any) => void;
    style?: Object;
};

export default (props: FileInputProps) => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        props.onChange(files);
    }, [files]);

    const addFiles = event => {
        if (props.multiple) {
            setFiles(prev => [...prev, ...event.target.files]);
        } else {
            setFiles([...event.target.files]);
        }
    };

    const removeFile = (event, index) => {
        setFiles(prev => [...prev.slice(0, index), ...prev.slice(index + 1)]);

        event.preventDefault();
        event.stopPropagation();
        return false;
    };

    return (
        <Wrapper style={props?.style}>
            <InputWrapper>
                <Input
                    type="file"
                    multiple={props?.multiple}
                    onChange={addFiles}
                    onClick={(e: any) => {
                        if (!props.multiple) {
                            e.target.value = null;
                        }
                    }}
                />
                {props.label ? <Label>{props.label}</Label> : null}
                {files.length >= 1 ? (
                    <Files>
                        {files.map((file, index) => (
                            <File key={index}>
                                <FileLabel>{file.name}</FileLabel>
                                <DeleteIconWrapper onClick={e => removeFile(e, index)}>
                                    <DeleteIcon></DeleteIcon>
                                </DeleteIconWrapper>
                            </File>
                        ))}
                    </Files>
                ) : null}
                {files.length === 0 || props.multiple ? (
                    <Button>{props.multiple ? "Add files" : "Select file"}</Button>
                ) : null}
            </InputWrapper>
        </Wrapper>
    );
};
