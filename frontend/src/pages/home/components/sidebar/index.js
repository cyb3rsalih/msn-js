import React from "react";

import { Container } from "./styles";

//images
import msnLogo from "./assets/msn-logo.png";

//components
import AeroButton from "../../../components/aeroButton/index";

//icons
import { AiFillGithub, AiFillLinkedin, AiOutlineInstagram } from "react-icons/ai";

const sidebar = () => {
    return (
        <Container>
            <AeroButton className="button">
                <img src={msnLogo} alt="" />
            </AeroButton>
            <AeroButton className="button">
                <a href="http://www.github.com/pablobion" target="_blank">
                    <AiFillGithub size="30" />
                </a>
            </AeroButton>
            <AeroButton className="button">
                <a href="http://www.linkedin.com/in/pablobion" target="_blank">
                    <AiFillLinkedin size="30" color="#0e76a8" />
                </a>
            </AeroButton>
            <AeroButton className="button">
                <a href="http://www.instagram.com/pablobion" target="_blank">
                    <AiOutlineInstagram size="30" color="#E1306C" />
                </a>
            </AeroButton>
        </Container>
    );
};

export default sidebar;
