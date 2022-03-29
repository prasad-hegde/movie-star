import MUIButton from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const ColorButton = styled(MUIButton)(({ theme ,buttonColor}) => ({
    color: "#FFFFFF",
    backgroundColor:buttonColor?buttonColor:"#DE384C" ,
    "&:hover": {
      backgroundColor: "#C53546"
      // "#b92e3f"
    }
}));

export default function Button({label,onClick,disabled=false,color}) {
    return (
        <ColorButton buttonColor={color} colordisabled={disabled} variant="contained" onClick={onClick}>
            {label}
        </ColorButton>
    );
}

