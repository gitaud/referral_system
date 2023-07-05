import { useRef, useLayoutEffect } from 'react';

function useSetDocumentTitle(title, prevailOnUnmount=false) {
	const defaultTitle = useRef(document.title);

	useLayoutEffect(() => {
		document.title = title;
	}, [ title ]);

	useLayoutEffect(() => {
		if (prevailOnUnmount) {
			document.title = defaultTitle.current;
		}
	}, [prevailOnUnmount]);
}

export default useSetDocumentTitle;