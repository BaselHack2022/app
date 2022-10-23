import { Button, Link, Navbar, Text } from "@nextui-org/react";
import { Logo } from "../components/Logo";
import { Box } from "./Box";

export const Layout: React.FC<{ children: any }> = ({ children }) => {
  const collapseItems = ["Home", "Recipes", "Ingredients", "Profile"];
  return (
    <Box
      css={{
        maxW: "100%",
      }}
    >
      <Navbar isBordered variant="sticky">
        <Navbar.Brand>
          <Navbar.Toggle aria-label="toggle navigation" />
          <Logo />
          <Text b color="inherit" hideIn="xs"></Text>
        </Navbar.Brand>
        <Navbar.Content enableCursorHighlight hideIn="xs" variant="underline">
          <Navbar.Link href="/">Home</Navbar.Link>
          <Navbar.Link href="/recipes">Recipes</Navbar.Link>
          <Navbar.Link href="/ingredients">Ingredients</Navbar.Link>
          <Navbar.Link href="/profile">Profile</Navbar.Link>
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Item>
            <Button auto flat as={Link} href="/">
              Start
            </Button>
          </Navbar.Item>
        </Navbar.Content>
        <Navbar.Collapse>
          {collapseItems.map((item) => (
            <Navbar.CollapseItem key={item}>
              <Link
                color="inherit"
                css={{
                  minWidth: "100%",
                }}
                href={item.toLowerCase()}
              >
                {item}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>

      {children}
    </Box>
  );
};
