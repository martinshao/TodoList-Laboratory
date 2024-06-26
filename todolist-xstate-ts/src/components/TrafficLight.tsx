
const scale = 1 / 0.375;

export interface TrafficLightProps {
  onRedClick?: (event: React.MouseEvent<SVGUseElement, MouseEvent>) => void;
  onYellowClick?: (event: React.MouseEvent<SVGUseElement, MouseEvent>) => void;
  onGreenClick?: (event: React.MouseEvent<SVGUseElement, MouseEvent>) => void;
  RedOn?: boolean;
  YellowOn?: boolean;
  GreenOn?: boolean;
  Size?: number;
  BlackColor?: string;
  DisabledColor?: string;
  RedColor?: string;
  YellowColor?: string;
  GreenColor?: string;
  Horizontal?: boolean;
}

function TrafficLight(props: TrafficLightProps) {
  const {
    onRedClick,
    onYellowClick,
    onGreenClick,
    RedOn = false,
    YellowOn = false,
    GreenOn = false,
    Size = 60,
    BlackColor = '#000000',
    DisabledColor = '#4A4A4A',
    RedColor = '#D0021B',
    YellowColor = '#F8E71C',
    GreenColor = '#7ED321',
    Horizontal = false,
  } = props;

  return (
    <svg
      width={`${Size * (Horizontal ? scale : 1)}px`}
      height={`${Size * (Horizontal ? 1 : scale)}px`}
      viewBox={Horizontal ? '0 0 160 60' : '0 0 60 160'}
      version='1.1'
      {...props}
    >
      <defs>
        <circle
          style={{ cursor: Boolean(onRedClick) ? 'pointer' : undefined }}
          id='redCirclePath'
          cx='30'
          cy='30'
          r='20'
        />
        <circle
          style={{ cursor: Boolean(onYellowClick) ? 'pointer' : undefined }}
          id='yellowCirclePath'
          cx='30'
          cy='80'
          r='20'
        />
        <circle
          style={{ cursor: Boolean(onGreenClick) ? 'pointer' : undefined }}
          id='greenCirclePath'
          cx='30'
          cy='130'
          r='20'
        />

        <filter
          x='-50%'
          y='-50%'
          width='200%'
          height='200%'
          filterUnits='objectBoundingBox'
          id='shadowFilter'
        >
          <feGaussianBlur
            stdDeviation='3'
            in='SourceAlpha'
            result='shadowBlurInner1'
          />
          <feOffset
            dx='0'
            dy='4'
            in='shadowBlurInner1'
            result='shadowOffsetInner1'
          />
          <feComposite
            in='shadowOffsetInner1'
            in2='SourceAlpha'
            operator='arithmetic'
            k2='-1'
            k3='1'
            result='shadowInnerInner1'
          />
          <feColorMatrix
            values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0'
            type='matrix'
            in='shadowInnerInner1'
          />
        </filter>
      </defs>
      <g transform={Horizontal ? `rotate(-90 30 30)` : undefined}>
        <rect fill={BlackColor} x='0' y='0' width='60' height='160' rx='8' />

        <use
          fill={RedOn ? RedColor : DisabledColor}
          fillRule='evenodd'
          xlinkHref='#redCirclePath'
        />
        <use
          fill={YellowOn ? YellowColor : DisabledColor}
          fillRule='evenodd'
          xlinkHref='#yellowCirclePath'
        />
        <use
          fill={GreenOn ? GreenColor : DisabledColor}
          fillRule='evenodd'
          xlinkHref='#greenCirclePath'
        />

        <use
          onClick={onRedClick}
          fill='black'
          fillOpacity='1'
          filter='url(#shadowFilter)'
          xlinkHref='#redCirclePath'
        />
        <use
          onClick={onYellowClick}
          fill='black'
          fillOpacity='1'
          filter='url(#shadowFilter)'
          xlinkHref='#yellowCirclePath'
        />
        <use
          onClick={onGreenClick}
          fill='black'
          fillOpacity='1'
          filter='url(#shadowFilter)'
          xlinkHref='#greenCirclePath'
        />
      </g>
    </svg>
  );
}

export default TrafficLight;
