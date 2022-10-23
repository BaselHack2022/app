import { Card, Row, Text } from "@nextui-org/react";
import { Ingredient } from "../models/ingredient";

export interface IngredientCardProps {
  item: Ingredient;
  onPress?: (ingredient: Ingredient) => void;
}

const IngredientCard: React.FC<IngredientCardProps> = ({ item, onPress }) => {
  return (
    <Card
      isPressable
      onPress={onPress ? () => onPress(item): undefined}
      css={{
        borderWidth: 5,
        borderColor: "transparent",
        borderStyle: "solid",
      }}
    >
      <Card.Body css={{ p: 0 }}>
        <Card.Image
          src={item.image !== undefined ? item.image : "https://images.unsplash.com/photo-1528712306091-ed0763094c98"}
          objectFit="cover"
          width="100%"
          height={140}
          alt={item.name}
          showSkeleton
        />
      </Card.Body>
      <Card.Footer css={{ justifyItems: "flex-start" }}>
        <Row wrap="wrap" justify="space-between" align="center">
          <Text b>{item.name}</Text>
          <Text
            css={{
              color: "$accents7",
              fontWeight: "$semibold",
              fontSize: "$sm",
            }}
          >
            {item.stock}x
          </Text>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default IngredientCard;
