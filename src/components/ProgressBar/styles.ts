import styled from 'styled-components';

interface ContainerProps {
  progress: number;
  breakPointColors?: string[];
  breakPoints?: number[];
}

export const Container = styled.div<ContainerProps>`
  .progress-value {
    font-size: 10px;
    font-weight: 400;
    line-height: 19px;
    color: #b5b5c3;
  }

  .progress-bar {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 1rem;
    overflow: hidden;
    line-height: 0;
    font-size: 0.75rem;
    background-color: #ebedf3;
    border-radius: 0.42rem;
    -webkit-box-shadow: none;
    box-shadow: none;
    height: 0.5rem;

    .progress-bar-value {
      background-color: ${(props: ContainerProps) => {
        const breaks = props.breakPoints || [0, 30, 70, 90];
        const colors = props.breakPointColors || [
          'rgba(216, 216, 216, 1)',
          'rgba(248, 205, 53, 1)',
          'rgba(55, 239, 39, 0.3)',
          'rgba(55, 239, 39, 1)',
        ];
        let colorIndex = 0;
        if (breaks.length > colors.length) {
          throw new Error(
            'breakPoints array should not be greater than breakPointColors array'
          );
        }
        breaks.forEach((item, index) => {
          if (props.progress >= item) colorIndex = index;
        });
        return colors[colorIndex];
      }};
      width: ${props => `${props.progress}%`};
    }
  }
`;
