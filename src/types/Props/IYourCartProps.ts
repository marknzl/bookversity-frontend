interface IYourCartProps {
    items: JSX.Element[];
    total: number;
    purchaseButton: JSX.Element | undefined;
    checkoutFunc: (e: any) => void;
}

export default IYourCartProps;