import React, { useState } from "react";

import Container from "../../components/style/container.component";
import Content from "../../components/style/content.component";
import FileInput from "../../components/forms/file.input";

const ExampleScreen = () => {
    const [files, setFiles] = useState([]);

    return (
        <Container>
            <Content>
                <FileInput
                    label="My documents"
                    multiple
                    onChange={currentFiles => setFiles(currentFiles)}
                    style={{ width: 200 }}
                />
            </Content>
        </Container>
    );
};

export default ExampleScreen;
