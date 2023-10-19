import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface StatsWidgetType {
  title: string;
  count: number;
  icon: IconDefinition;
}

export const StatsWidget = (props: StatsWidgetType) => {
  const { title, count, icon } = props;

  return (
    <div className="bg-blue-500 rounded-lg shadow-md p-4 w-64">
      <div className="flex justify-between items-center">
        <div className="text-white text-5xl font-semibold">
          {count}
        </div>
        <div className='flex flex-col items-end'>
          <FontAwesomeIcon className='text-white' icon={icon} size='sm' />
          <div className="text-white text-lg font-medium ml-4">
            {title}
          </div>
        </div>
      </div>
    </div>
  );
};
