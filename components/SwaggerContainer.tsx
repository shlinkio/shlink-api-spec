import React, { FunctionComponent } from 'react';
import dynamic from 'next/dynamic';
import Header, { HeaderProps } from './Header';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(import('swagger-ui-react'), { ssr: false }); // Swagger UI cannot be server-side rendered

interface SwaggerContainerProps extends HeaderProps {
  url: string;
}

const SwaggerContainer: FunctionComponent<SwaggerContainerProps> = ({ url, setActiveTag, tags }) => (
  <React.Fragment>
    <Header setActiveTag={setActiveTag} tags={tags} />
    <SwaggerUI url={url} docExpansion="list" />
  </React.Fragment>
);

export default SwaggerContainer;
