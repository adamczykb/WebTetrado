import { render,screen } from '@testing-library/react';
import { Home } from '../components/home/Home'

test('render home',()=>{
    render(Home() );
    let linkDom = screen.getByText('Send request');

    expect(linkDom).toHaveProperty("disabled");
})
