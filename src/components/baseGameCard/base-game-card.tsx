import BaseCard from "components/baseCard/base-card";
import {ACRYLIC_COLOR, BACKGROUND_COLOR} from "constants/colors";
import React, {useState} from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {TouchableOpacity} from "react-native-windows";
import {Game} from "types/itchio.types";

type BaseGameCardProps = {
  game: Game;
  disabled?: boolean;
};

const BaseGameCard: React.FC<BaseGameCardProps> = ({
  game,
  disabled = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <TouchableOpacity>
      <BaseCard>
        <View
          style={[
            styles.container,
            isHovered && !disabled ? styles.hovered : styles.normal,
          ]}
          onMouseEnter={disabled ? undefined : handleMouseEnter}
          onMouseLeave={disabled ? undefined : handleMouseLeave}>
          <Image
            source={{uri: game?.img || game.cover_url}}
            style={styles.image}
          />
          <Text style={styles.title} numberOfLines={2}>
            {game.title}
          </Text>
          <CardAction status={game?.status} />
        </View>
      </BaseCard>
    </TouchableOpacity>
  );
};

const CardAction: React.FC<{status?: string}> = ({status}) => {
  if (!status) {
    return null;
  }

  return <Text style={styles.action}>action</Text>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 4,
  },
  image: {
    flex: 5,
    borderRadius: 4,
  },
  title: {
    marginTop: 5,
    flex: 4,
    fontSize: 13,
    fontFamily: "Latto-Bold",
    fontWeight: "bold",
  },
  action: {
    flex: 4,
    alignSelf: "center",
    padding: 5,
  },
  normal: {
    backgroundColor: ACRYLIC_COLOR,
  },
  hovered: {
    backgroundColor: BACKGROUND_COLOR,
  },
});

export default BaseGameCard;
