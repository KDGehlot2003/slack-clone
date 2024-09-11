import React from 'react'
import Stack from '@mui/material/Stack';

function Header() {
  return (
    <Stack direction="row" spacing={2}>
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
    </Stack>
  )
}

export default Header