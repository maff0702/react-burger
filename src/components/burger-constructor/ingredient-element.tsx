import { useRef, FC} from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { ingredientCurrentDecrement } from '../../store/ingredientsSlice';
import { deleteElementConstructor, moveIngredientConstructor } from '../../store/constructorSlice';
import { TIngredientItem } from './ingredients';

interface DragItem {
  index: number
  id: string
  type: string
}

type TIngredientProps = {
  data: TIngredientItem;
  index: number;
};

const IngedientElement: FC<TIngredientProps> = ({data, index}: TIngredientProps) => {
  const dispatch = useDispatch();
  const id = data._id;
  const ref = useRef(null) as any;

  const [, drop] = useDrop({
    accept: 'ingredientItem',
    hover: (item: DragItem, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {return}
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as any).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {return}
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {return}
      dispatch(moveIngredientConstructor({dragIndex,hoverIndex}));
      item.index = hoverIndex;
    }
  })
  const [{isDragging}, drag] = useDrag({
    type: 'ingredientItem',
    item: () => {
      return {id, index}
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  })

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref))

  return (
    <span ref={ref} draggable style={{opacity}}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={data.name}
        price={data.price}
        thumbnail={data.image}
        handleClose={()=>{
          dispatch(deleteElementConstructor({index, id}));
          dispatch(ingredientCurrentDecrement({id}));
          }}
      />
    </span>
  )
}

export default IngedientElement;
