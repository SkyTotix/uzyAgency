export const ACTIVE_BACKGROUND_QUERY = `
  *[_type == "background" && isActive == true][0] {
    _id,
    title,
    slug,
    backgroundType,
    svgFile {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    imageFile {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    gradientColors,
    gradientDirection,
    shapesConfig {
      shapeCount,
      shapeTypes,
      colors
    },
    opacity,
    blendMode,
    animation {
      enabled,
      type,
      duration
    },
    description
  }
`;

export const ALL_BACKGROUNDS_QUERY = `
  *[_type == "background"] | order(isActive desc, title asc) {
    _id,
    title,
    slug,
    backgroundType,
    isActive,
    opacity,
    blendMode,
    animation {
      enabled,
      type,
      duration
    },
    description
  }
`;

export const BACKGROUND_BY_SLUG_QUERY = `
  *[_type == "background" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    backgroundType,
    svgFile {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    imageFile {
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    },
    gradientColors,
    gradientDirection,
    shapesConfig {
      shapeCount,
      shapeTypes,
      colors
    },
    opacity,
    blendMode,
    animation {
      enabled,
      type,
      duration
    },
    description
  }
`;
