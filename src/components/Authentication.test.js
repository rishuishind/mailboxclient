import { render, screen } from "@testing-library/react"
import Authentication from "./Authentication"

describe('Authentication Test', () => {
    test('Paragraph Test', () => {

        render(<Authentication />);

        const text = screen.getByText('Forget Password ?', { exact: false });
        expect(text).toBeInTheDocument();

    })
})