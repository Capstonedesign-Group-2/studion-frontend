import React, { useEffect, useRef, memo } from 'react';

const Video = ({ name, stream }: { name: string, stream: MediaStream }) => {
	const ref = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		if (ref.current) ref.current.srcObject = stream;
	}, [stream]);

	return (
		<>
			<video ref={ref} autoPlay />
			<p>{name}</p>
		</>
	);
};

export default memo(Video);
