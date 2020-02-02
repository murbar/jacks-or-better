import { useEffect } from 'react';

const envIsDevelopment = process.env.NODE_ENV === 'development';

export default function useDebugLogging(data, label = 'Data') {
  useEffect(() => {
    if (envIsDevelopment) console.log(label, data);
  }, [data, label]);
}
