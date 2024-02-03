/** @type {import('tailwindcss').Config} */

const generateScaleAnimations = () => {
  const directions = {
    center: "50% 50%",
    top: "50% 0%",
    tr: "100% 0%",
    right: "100% 50%",
    br: "100% 100%",
    bottom: "50% 100%",
    bl: "0% 100%",
    left: "0% 50%",
    tl: "0% 0%",
    "ver-center": "50% 50%",
    "ver-top": "50% 0%",
    "ver-bottom": "50% 100%",
    "hor-center": "50% 50%",
    "hor-left": "0% 50%",
    "hor-right": "100% 50%",
  };

  const keyframes = {};
  const animations = {};

  // Generate scale-up animations
  Object.entries(directions).forEach(([direction, origin]) => {
    const scaleUpName = `scale-up-${direction}`;
    keyframes[scaleUpName] = {
      "0%": {
        transform: "scale(0.5)",
        "transform-origin": origin,
      },
      "100%": {
        transform: "scale(1)",
        "transform-origin": origin,
      },
    };
    animations[`${scaleUpName}`] =
      `${scaleUpName} 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both`;
  });

  // Generate scale-down animations
  Object.entries(directions).forEach(([direction, origin]) => {
    const scaleDownName = `scale-down-${direction}`;
    keyframes[scaleDownName] = {
      "0%": {
        transform: "scale(1)",
        "transform-origin": origin,
      },
      "100%": {
        transform: "scale(0.5)",
        "transform-origin": origin,
      },
    };
    animations[`${scaleDownName}`] =
      `${scaleDownName} 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both`;
  });

  return { keyframes, animations };
};

const generateShadowPopAnimations = (
  distance = "8px",
  shadowColor = "#3e3e3e"
) => {
  const directions = {
    tl: { x: distance, y: distance, boxShadowDirection: "-1px -1px" },
    tr: { x: `-${distance}`, y: distance, boxShadowDirection: "1px -1px" },
    bl: { x: distance, y: `-${distance}`, boxShadowDirection: "-1px 1px" },
    br: { x: `-${distance}`, y: `-${distance}`, boxShadowDirection: "1px 1px" },
  };

  const keyframes = {};
  const animations = {};

  Object.entries(directions).forEach(
    ([direction, { x, y, boxShadowDirection }]) => {
      const name = `shadow-pop-${direction}`;
      let boxShadowValue = "";
      for (let i = 1; i <= 8; i++) {
        boxShadowValue += `${i * parseInt(boxShadowDirection)}px ${i * parseInt(boxShadowDirection.split(" ")[1])}px ${shadowColor}, `;
      }
      boxShadowValue = boxShadowValue.slice(0, -2); // Remove the trailing comma and space

      keyframes[name] = {
        "0%": {
          "box-shadow": `0 0 ${shadowColor}, `.repeat(8).slice(0, -2),
          transform: "translateX(0) translateY(0)",
        },
        "100%": {
          "box-shadow": boxShadowValue,
          transform: `translateX(${x}) translateY(${y})`,
        },
      };

      animations[`${name}`] =
        `${name} 0.3s cubic-bezier(0.470, 0.000, 0.745, 0.715) both`;
    }
  );

  return { keyframes, animations };
};

const generateVerticalFlipAnimations = () => {
  const flips = {
    "flip-vertical-fwd": {
      initialTransform: "translateZ(0) rotateY(0)",
      finalTransform: "translateZ(160px) rotateY(180deg)",
    },
    "flip-vertical-bck": {
      initialTransform: "translateZ(0) rotateY(0)",
      finalTransform: "translateZ(-260px) rotateY(-180deg)",
    },
    "flip-vertical-left": {
      initialTransform: "rotateY(0)",
      finalTransform: "rotateY(-180deg)",
    },
    "flip-vertical-right": {
      initialTransform: "rotateY(0)",
      finalTransform: "rotateY(180deg)",
    },
  };

  const keyframes = {};
  const animations = {};

  Object.entries(flips).forEach(
    ([name, { initialTransform, finalTransform }]) => {
      keyframes[name] = {
        "0%": { transform: initialTransform },
        "100%": { transform: finalTransform },
      };

      animations[name] =
        `${name} 0.4s cubic-bezier(0.455, 0.030, 0.515, 0.955) both`;
    }
  );

  return { keyframes, animations };
};

const generateFlipAnimations = () => {
  const flips = {
    "flip-2-ver-right-fwd": {
      transformOriginStart: "100% 50%",
      transformOriginEnd: "0% 50%",
      translateX: "100%",
      translateZStart: "0",
      translateZEnd: "160px",
      rotateY: "-180deg",
    },
    "flip-2-ver-right-bck": {
      transformOriginStart: "100% 50%",
      transformOriginEnd: "0% 50%",
      translateX: "100%",
      translateZStart: "0",
      translateZEnd: "-260px",
      rotateY: "180deg",
    },
    "flip-2-ver-right-2": {
      transformOriginStart: "100% 50%",
      transformOriginEnd: "0% 50%",
      translateX: "100%",
      rotateY: "180deg",
    },
    "flip-2-ver-right-1": {
      transformOriginStart: "100% 50%",
      transformOriginEnd: "0% 50%",
      translateX: "100%",
      rotateY: "-180deg",
    },
    // Adding left variants
    "flip-2-ver-left-fwd": {
      transformOriginStart: "0% 50%",
      transformOriginEnd: "100% 50%",
      translateX: "-100%",
      translateZStart: "0",
      translateZEnd: "160px",
      rotateY: "180deg",
    },
    "flip-2-ver-left-bck": {
      transformOriginStart: "0% 50%",
      transformOriginEnd: "100% 50%",
      translateX: "-100%",
      translateZStart: "0",
      translateZEnd: "-260px",
      rotateY: "-180deg",
    },
    "flip-2-ver-left-2": {
      transformOriginStart: "0% 50%",
      transformOriginEnd: "100% 50%",
      translateX: "-100%",
      rotateY: "-180deg",
    },
    "flip-2-ver-left-1": {
      transformOriginStart: "0% 50%",
      transformOriginEnd: "100% 50%",
      translateX: "-100%",
      rotateY: "180deg",
    },
  };

  const keyframes = {};
  const animations = {};

  Object.entries(flips).forEach(([name, config]) => {
    keyframes[name] = {
      "0%": {
        transform: `translateX(0) translateZ(${config.translateZStart || "0"}) rotateY(0)`,
        "transform-origin": config.transformOriginStart,
      },
      "100%": {
        transform: `translateX(${config.translateX}) translateZ(${config.translateZEnd || config.translateZStart || "0"}) rotateY(${config.rotateY})`,
        "transform-origin": config.transformOriginEnd,
      },
    };

    animations[name] =
      `${name} 0.5s cubic-bezier(0.455, 0.030, 0.515, 0.955) both`;
  });

  return { keyframes, animations };
};

const generateScaleFlipAnimations = () => {
  const flips = {
    "flip-scale-up-ver": {
      timing: "0.5s linear both",
      keyframes: {
        "0%": { transform: "scale(1) rotateY(0)" },
        "50%": { transform: "scale(2.5) rotateY(90deg)" },
        "100%": { transform: "scale(1) rotateY(180deg)" },
      },
    },
    "flip-scale-down-ver": {
      timing: "0.5s linear both",
      keyframes: {
        "0%": { transform: "scale(1) rotateY(0)" },
        "50%": { transform: "scale(0.4) rotateY(-90deg)" },
        "100%": { transform: "scale(1) rotateY(-180deg)" },
      },
    },
    "flip-scale-2-ver-right": {
      timing: "0.5s linear both",
      keyframes: {
        "0%": {
          transform: "translateX(0) rotateY(0) scale(1)",
          "transform-origin": "100% 50%",
        },
        "50%": {
          transform: "translateX(50%) rotateY(-90deg) scale(2)",
          "transform-origin": "50% 50%",
        },
        "100%": {
          transform: "translateX(100%) rotateY(-180deg) scale(1)",
          "transform-origin": "0% 50%",
        },
      },
    },
    "flip-scale-2-ver-left": {
      timing: "0.5s linear both",
      keyframes: {
        "0%": {
          transform: "translateX(0) rotateY(0) scale(1)",
          "transform-origin": "0% 50%",
        },
        "50%": {
          transform: "translateX(-50%) rotateY(90deg) scale(2)",
          "transform-origin": "50% 50%",
        },
        "100%": {
          transform: "translateX(-100%) rotateY(180deg) scale(1)",
          "transform-origin": "100% 50%",
        },
      },
    },
  };

  const keyframes = {};
  const animations = {};

  Object.entries(flips).forEach(([name, { timing, keyframes: frames }]) => {
    keyframes[name] = frames;
    animations[name] = `${name} ${timing}`;
  });

  return { keyframes, animations };
};

const generateSwingAnimations = () => {
  const swings = {
    "swing-right-fwd": {
      duration: "0.4s",
      timingFunction: "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
      keyframes: {
        "0%": {
          transform: "rotateY(0)",
          "transform-origin": "right",
        },
        "100%": {
          transform: "rotateY(180deg)",
          "transform-origin": "right",
        },
      },
    },
    "swing-left-fwd": {
      duration: "0.4s",
      timingFunction: "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
      keyframes: {
        "0%": {
          transform: "rotateY(0)",
          "transform-origin": "left bottom",
        },
        "100%": {
          transform: "rotateY(-180deg)",
          "transform-origin": "left bottom",
        },
      },
    },
  };

  const keyframes = {};
  const animations = {};

  Object.entries(swings).forEach(
    ([name, { duration, timingFunction, keyframes: frames }]) => {
      keyframes[name] = frames;
      animations[name] = `${name} ${duration} ${timingFunction} both`;
    }
  );

  return { keyframes, animations };
};

const generateSlideAnimations = (distance = "100px") => {
  const directions = {
    top: { x: "0", y: `-${distance}` },
    tr: { x: distance, y: `-${distance}` },
    right: { x: distance, y: "0" },
    br: { x: distance, y: distance },
    bottom: { x: "0", y: distance },
    bl: { x: `-${distance}`, y: distance },
    left: { x: `-${distance}`, y: "0" },
    tl: { x: `-${distance}`, y: `-${distance}` },
  };

  const keyframes = {};
  const animations = {};

  Object.entries(directions).forEach(([direction, { x, y }]) => {
    const animationName = `slide-${direction}`;
    keyframes[animationName] = {
      "0%": { transform: "translateY(0) translateX(0)" },
      "100%": { transform: `translateY(${y}) translateX(${x})` },
    };

    animations[animationName] =
      `${animationName} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`;
  });

  return { keyframes, animations };
};

const generateScaleSlideAnimations = (
  distanceBck = "-400px",
  distanceFwd = "160px",
  timingBck = "0.45s cubic-bezier(0.470, 0.000, 0.745, 0.715)",
  timingFwd = "0.45s cubic-bezier(0.250, 0.460, 0.450, 0.940)"
) => {
  const directions = {
    center: {},
    top: { y: "-100%" },
    tr: { x: "100%", y: "-100%" },
    right: { x: "100%" },
    br: { x: "100%", y: "100%" },
    bottom: { y: "100%" },
    bl: { x: "-100%", y: "100%" },
    left: { x: "-100%" },
    tl: { x: "-100%", y: "-100%" },
  };

  const keyframes = {};
  const animations = {};

  // Generate backward animations
  Object.entries(directions).forEach(([direction, coords]) => {
    const { x = "0", y = "0" } = coords; // Default to "0" if not specified
    const nameBck = `slide-bck-${direction}`;
    keyframes[nameBck] = {
      "0%": { transform: `translateX(${x}) translateY(${y}) translateZ(0)` },
      "100%": {
        transform: `translateX(${x}) translateY(${y}) translateZ(${distanceBck})`,
      },
    };
    animations[nameBck] = `${nameBck} ${timingBck} both`;
  });

  // Generate forward animations
  Object.entries(directions).forEach(([direction, coords]) => {
    const { x = "0", y = "0" } = coords; // Default to "0" if not specified
    const nameFwd = `slide-fwd-${direction}`;
    keyframes[nameFwd] = {
      "0%": { transform: `translateX(${x}) translateY(${y}) translateZ(0)` },
      "100%": {
        transform: `translateX(${x}) translateY(${y}) translateZ(${distanceFwd})`,
      },
    };
    animations[nameFwd] = `${nameFwd} ${timingFwd} both`;
  });

  return { keyframes, animations };
};

const generateShadowDropAnimations = () => {
  const shadowDropVariants = {
    center: { transform: "", boxShadow: "0 0 20px 0 rgba(0, 0, 0, .35)" },
    top: {
      transform: "translateY(-12px)",
      boxShadow: "0 12px 20px -12px rgba(0, 0, 0, .35)",
    },
    right: {
      transform: "translateX(12px)",
      boxShadow: "-12px 0 20px -12px rgba(0, 0, 0, .35)",
    },
    bottom: {
      transform: "translateY(12px)",
      boxShadow: "0 -12px 20px -12px rgba(0, 0, 0, .35)",
    },
    left: {
      transform: "translateX(-12px)",
      boxShadow: "12px 0 20px -12px rgba(0, 0, 0, .35)",
    },
    lr: {
      transform: "translateX(25px)",
      boxShadow: "-25px 0 20px -12px rgba(0, 0, 0, .35)",
    },
    tb: {
      transform: "translateY(25px)",
      boxShadow: "0 -25px 20px -12px rgba(0, 0, 0, .35)",
    },
    tr: {
      transform: "translate(12px, -12px)",
      boxShadow: "-12px 12px 20px -12px rgba(0, 0, 0, .35)",
    },
    br: {
      transform: "translate(12px, 12px)",
      boxShadow: "-12px -12px 20px -12px rgba(0, 0, 0, .35)",
    },
    bl: {
      transform: "translate(-12px, 12px)",
      boxShadow: "12px -12px 20px -12px rgba(0, 0, 0, .35)",
    },
    tl: {
      transform: "translate(-12px, -12px)",
      boxShadow: "12px 12px 20px -12px rgba(0, 0, 0, .35)",
    },
  };

  const keyframes = {};
  const animations = {};

  Object.entries(shadowDropVariants).forEach(
    ([direction, { transform, boxShadow }]) => {
      const baseName = `shadow-drop-${direction}`;
      const extendedName = `shadow-drop-move-${direction}`;

      // Base Shadow Drop
      keyframes[baseName] = {
        "0%": { "box-shadow": "0 0 0 0 transparent" },
        "100%": { "box-shadow": boxShadow },
      };
      animations[baseName] =
        `${baseName} 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`;

      // Extended Shadow Drop with motion
      keyframes[extendedName] = {
        "0%": {
          transform: "translateZ(0) " + transform,
          "box-shadow": "0 0 0 0 transparent",
        },
        "100%": {
          transform: `translateZ(50px) ${transform}`,
          "box-shadow": boxShadow,
        },
      };
      animations[extendedName] =
        `${extendedName} 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`;
    }
  );

  return { keyframes, animations };
};

const scaleTransformations = generateScaleAnimations();
const shadowPopTransformations = generateShadowPopAnimations();
const verticalFlipTransformations = generateVerticalFlipAnimations();
const flipTransformations = generateFlipAnimations();
const scaleFlipTransformations = generateScaleFlipAnimations();
const swingTransformations = generateSwingAnimations();
const slideTransformations = generateSlideAnimations();
const scaleSlideTransformations = generateScaleSlideAnimations();
const shadowDropTransformations = generateShadowDropAnimations();

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        ...scaleTransformations.keyframes,
        ...shadowPopTransformations.keyframes,
        ...verticalFlipTransformations.keyframes,
        ...flipTransformations.keyframes,
        ...scaleFlipTransformations.keyframes,
        ...swingTransformations.keyframes,
        ...slideTransformations.keyframes,
        ...scaleSlideTransformations.keyframes,
        ...shadowDropTransformations.keyframes,
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        ...scaleTransformations.animations,
        ...shadowPopTransformations.animations,
        ...verticalFlipTransformations.animations,
        ...flipTransformations.animations,
        ...scaleFlipTransformations.animations,
        ...swingTransformations.animations,
        ...slideTransformations.animations,
        ...scaleSlideTransformations.animations,
        ...shadowDropTransformations.animations,
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
