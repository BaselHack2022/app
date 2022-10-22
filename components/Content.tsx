import { Button, Card, Container, Grid, Row, Text } from "@nextui-org/react";
import { useState } from "react";

export const Content = () => {
  const list = [
    {
      title: "Orange",
      img: "/images/fruit-1.jpeg",
      calories: 30,
    },
    {
      title: "Tangerine",
      img: "/images/fruit-2.jpeg",
      calories: 30,
    },
    {
      title: "Cherry",
      img: "/images/fruit-3.jpeg",
      calories: 30,
    },
    {
      title: "Lemon",
      img: "/images/fruit-4.jpeg",
      calories: 30,
    },
    {
      title: "Avocado",
      img: "/images/fruit-5.jpeg",
      calories: 30,
    },
    {
      title: "Lemon 2",
      img: "/images/fruit-6.jpeg",
      calories: 30,
    },
    {
      title: "Banana",
      img: "/images/fruit-7.jpeg",
      calories: 30,
    },
    {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      calories: 30,
    },
  ];

  const [selected, setSelected] = useState<number[]>([]);

  const handleSelect = (index: any) => {
    if (selected.includes(index)) {
      setSelected(selected.filter((item) => item !== index));
      return;
    }
    setSelected((prev) => [...prev, index]);
  };

  return (
    <Container fluid>
      <Grid.Container gap={1}>
        {list.map((item, index) => (
          <Grid xs={6} key={index}>
            <Card
              isPressable
              onPress={() => handleSelect(index)}
              css={{
                borderWidth: 5,
                borderColor: selected.includes(index)
                  ? "var(--nextui-colors-blue600)"
                  : "transparent",
                borderStyle: "solid",
              }}
            >
              <Card.Body css={{ p: 0 }}>
                <Card.Image
                  src={"https://nextui.org" + item.img}
                  objectFit="cover"
                  width="100%"
                  height={140}
                  alt={item.title}
                />
              </Card.Body>
              <Card.Footer css={{ justifyItems: "flex-start" }}>
                <Row wrap="wrap" justify="space-between" align="center">
                  <Text b>{item.title}</Text>
                  <Text
                    css={{
                      color: "$accents7",
                      fontWeight: "$semibold",
                      fontSize: "$sm",
                    }}
                  >
                    {item.calories} kcal
                  </Text>
                </Row>
              </Card.Footer>
            </Card>
          </Grid>
        ))}
      </Grid.Container>
      <Card
        style={{
          position: "sticky",
          bottom: 10,
          width: "100%",
          margin: 0,
        }}
      >
        <Card.Body>
          <Grid.Container justify="center" gap={1}>
            <Grid xs={6}>
              <Text size={18} weight="bold" css={{ verticalAlign: "middle" }}>
                {selected.length} selected
              </Text>
            </Grid>
            <Grid xs={6}>
              <Button
                color="gradient"
                auto
                disabled={selected.length === 0}
                style={{ width: "100%" }}
              >
                Go
              </Button>
            </Grid>
          </Grid.Container>
        </Card.Body>
      </Card>
    </Container>
  );
};
