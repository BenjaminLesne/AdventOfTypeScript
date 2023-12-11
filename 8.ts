type Good = {
	[TKey: `good_${string}`]: unknown
	}
type RemoveNaughtyChildren<TList extends Object> = {
	[TKey in keyof TList as TKey extends `naughty_${string}` ? never : TKey]: TList[TKey]
};