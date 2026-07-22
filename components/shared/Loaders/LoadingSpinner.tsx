interface ILoadingSpinnerProps {
  asLayout?: boolean;
  size?: 'default' | 'sm';
}

const LoadingSpinner: React.FC<ILoadingSpinnerProps> = ({
  asLayout,
  size = 'default',
}) => {
  return (
    <div
      className={`flex items-center justify-center ${
        asLayout
          ? 'bg-opacity/80 absolute top-0 left-0 z-50 size-full backdrop-blur-md'
          : ''
      }`}
    >
      <div />
      <span className={size === 'sm' ? 'loader-sm' : 'loader'}></span>
    </div>
  );
};

export default LoadingSpinner;
