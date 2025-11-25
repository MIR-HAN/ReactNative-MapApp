const { Colors } = require("../theme/colors");



const setColors = (index) => {
    switch (index % 8) {  
      case 0:
        return Colors.GREEN;
      case 1:
        return Colors.RED;
      case 2:
        return Colors.STAR_YELLOW;
      case 3:
        return Colors.GRAY;
      case 4:
        return Colors.YELLOW;
      case 5:
        return Colors.PURPLE;
      case 6:
        return Colors.ORANGE;
      case 7:
        return Colors.BLUE;
      default:
        return Colors.BLACK; 
    }
  };

export {setColors};