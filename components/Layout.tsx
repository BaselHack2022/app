import { Content } from "./Content";
import { Box } from "./Box";

export const Layout: React.FC<{ children: any }> = ({ children }) => (
  <Box
    css={{
      maxW: "100%",
    }}
  >
    {children}
    <Content />
  </Box>
);
