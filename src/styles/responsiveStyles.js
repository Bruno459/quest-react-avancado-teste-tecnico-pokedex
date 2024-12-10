import { createGlobalStyle } from "styled-components";

export const ResponsiveStyle = createGlobalStyle`
    @media screen and (max-width: 1024px) {
        div, section {
            padding: 0 20px;
        }
    }

    @media screen and (max-width: 768px) {
        div, section {
            flex-direction: column;
            align-items: center;
        }

        ul {
            justify-content: center;
            flex-direction: column;
            flex-wrap: nowrap;
            max-width: 130px;
        }

        li {
            width: 45%;
            margin: 10px;
        }
    }

    @media screen and (max-width: 480px) {
        li {
            width: 100%;
        }

        h1 {
            font-size: 24px;
        }

        h2 {
            font-size: 18px;
        }
    }
`