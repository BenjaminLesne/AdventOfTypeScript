type Address = { address: string; city: string };
type PresentDeliveryList<TObject extends Object> = {
	[TKey in keyof TObject]: Address
};