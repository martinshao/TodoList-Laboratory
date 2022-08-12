
import React from 'react';
import useUpdate from '../hooks/useUpdate'

const style = {
  margin: '10px',
  border: '1px solid blue',
}

const eventLog = (useCapture: boolean, elementName: string) => {
  const phaseType = useCapture ? 'Capturing' : 'Bubbling'
  console.info(`${phaseType} ${elementName}`)
}

const UseUpdateDemo: React.FC<any> = (props) => {
  const update = useUpdate();

  const handleClick = (event: React.MouseEvent<HTMLFormElement | HTMLDivElement | HTMLParagraphElement>, useCapture: boolean, elementName: string) => {
    // event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
    console.info(event.nativeEvent)
    const phaseType = useCapture ? 'Capturing' : 'Bubbling'
    console.info(`${phaseType} ${elementName}`)
  }

  const handleFormClick = (event: React.MouseEvent<HTMLFormElement>): void => {
    eventLog(false, 'form')
  }

  const handleDivClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    eventLog(false, 'div')
  }

  const handlePClick = (event: React.MouseEvent<HTMLParagraphElement>) => {
    eventLog(false, 'paragraph')
  }

  return (
    <div style={{ padding: 50 }}>
      <div>时间：{Date.now()}</div>
      <button color='primary' onClick={update}>更新时间</button>
      {/* <form style={style} onClick={(e: any) => handleClick(e, false, 'form')} >FORM
        <div style={style} onClick={(e: any) => handleClick(e, false, 'div')} >DIV
          <p style={style} onClick={(e: any) => handleClick(e, false, 'p')} >P</p>
        </div>
      </form> */}
      {/* <form style={style} onClickCapture={(e: any) => handleClick(e, true, 'form')}>FORM
        <div style={style} onClickCapture={(e: any) => handleClick(e, true, 'div')}>DIV
          <p style={style} onClickCapture={(e: any) => handleClick(e, true, 'p')}>P</p>
        </div>
      </form> */}
      <form style={style} onClick={(e: any) => handleClick(e, false, 'form')} onClickCapture={(e: any) => handleClick(e, true, 'form')}>FORM
        <div style={style} onClick={(e: any) => handleClick(e, false, 'div')} onClickCapture={(e: any) => handleClick(e, true, 'div')}>DIV
          <p style={style} onClick={(e: any) => handleClick(e, false, 'p')} onClickCapture={(e: any) => handleClick(e, true, 'p')}>P</p>
        </div>
      </form>
      <form style={style} onClick={handleFormClick}>FORM
        <div style={style} onClick={handleDivClick}>DIV
          <p style={style} onClick={handlePClick}>P</p>
        </div>
      </form>
    </div >
  );
}

export default UseUpdateDemo;