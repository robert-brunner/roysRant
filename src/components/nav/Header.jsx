import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Dropdown,
} from "flowbite-react";

import { Link } from "react-router-dom";

const NavigationBar = () => {

  return (

    <Navbar fluid rounded>

      <NavbarBrand as={Link} to="/">
        Roy's Rant
      </NavbarBrand>

      <NavbarToggle />

      <NavbarCollapse>

        <NavbarLink as={Link} to="/">
          HOME
        </NavbarLink>

        <Dropdown
          inline
          label="HEALTH & NUTRITION"
        >

          <Dropdown.Item as={Link} to="/nutrition-essentials">
            NUTRITION ESSENTIALS
          </Dropdown.Item>

          <Dropdown.Item as={Link} to="/cancer">
            CANCER
          </Dropdown.Item>

          <Dropdown.Item as={Link} to="/cholesterol">
            CHOLESTEROL
          </Dropdown.Item>

        </Dropdown>

        <Dropdown
          inline
          label="POLITICS & ECONOMICS"
        >

          <Dropdown.Item as={Link} to="/economy">
            ECONOMY
          </Dropdown.Item>

          <Dropdown.Item as={Link} to="/debt">
            NATIONAL DEBT
          </Dropdown.Item>

        </Dropdown>

      </NavbarCollapse>

    </Navbar>

  );
};

export default NavigationBar;