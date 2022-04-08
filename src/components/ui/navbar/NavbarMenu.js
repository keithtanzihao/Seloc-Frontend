import React from "react";
import { NavLink } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";

import styles from "../../../styles/main.module.css";

// Functional Component for framer motion.
export default function NavbarMenu(props) {

  const topVariant = {
    closed: { d: "M7.5 7.5L85.5 7.5" },
    open: { d: "M82.9533 85.5599L8 10.6066" }
  }
  
  const midVariant = {
    closed: { d: "M7.5 46.5L85.5 46.5", opacity: 1},
    open: { opacity: 0 }
  }
  
  const botVariant = {
    closed: { d: "M7.5 85.5L85.5 85.5" },
    open: { d: "M8 84.9533L82.9533 10" }
  }

  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const pathTopCtrl = useAnimation();
  const pathMidCtrl = useAnimation();
  const pathBotCtrl = useAnimation();

  const checkIsClicked = async () => {
    setMenuOpen(!isMenuOpen);
    props.setIsMenuOpen();
    if (!isMenuOpen) {
      pathTopCtrl.start(topVariant.open);
      pathMidCtrl.start(midVariant.open);
      pathBotCtrl.start(botVariant.open);
    } else {
      pathTopCtrl.start(topVariant.closed);
      pathMidCtrl.start(midVariant.closed);
      pathBotCtrl.start(botVariant.closed);
    }
  }

  const pathOptions = {
    stroke: "#000000",
    strokeWidth: "8",
    strokeLinecap: "round"
  }

  return (
    <button className={`${styles["navmenu__btn"]}`} onClick={checkIsClicked}>
      <svg className={`${styles["navmenu__btn__svg"]}`} viewBox="0 0 94 96">
        <motion.path
          {...topVariant.closed}
          animate={pathTopCtrl}
          transition={{ duration: 0.3 }}
          {...pathOptions}
        />
        <motion.path
          {...midVariant.closed}
          animate={pathMidCtrl}
          transition={{ duration: 0.2 }}
          {...pathOptions}
        />
        <motion.path
          {...botVariant.closed}
          animate={pathBotCtrl}
          transition={{ duration: 0.3 }}
          {...pathOptions}
        />
      </svg>
    </button>
  )
}


