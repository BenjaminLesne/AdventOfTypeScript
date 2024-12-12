type AppendGood<TObject extends Object> = {
	[TKey in keyof TObject as `good_${string & TKey}`]: TObject[TKey] ;
};