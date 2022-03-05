import MUIButton from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const ColorButton = styled(MUIButton)(({ theme }) => ({
    color: "#FFFFFF",
    backgroundColor: "#DE384C",
    "&:hover": {
      backgroundColor: "#C53546"
      // "#b92e3f"
    }
}));

export default function Button({label,onClick}) {
    return (
        <ColorButton variant="contained" onClick={onClick}>
            {label}
        </ColorButton>
    );
}

