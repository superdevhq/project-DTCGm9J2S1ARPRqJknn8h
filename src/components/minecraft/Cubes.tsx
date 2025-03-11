
import { useStore } from './hooks/useStore';
import Cube from './Cube';

const Cubes = () => {
  // Get cubes from the store
  const cubes = useStore((state) => state.cubes);
  
  return (
    <>
      {cubes.map(({ id, pos, texture }) => (
        <Cube key={id} id={id} position={pos} texture={texture} />
      ))}
    </>
  );
};

export default Cubes;
