import { getFormatTime } from '@/utils';
import { Divider, Space } from 'antd';

export default function SingList(props) {
  const { singList, setSingList } = props;


  return (
    <Space direction='vertical'>
      <Divider orientationMargin={0} style={{ margin: 0 }}>
        <span className='color-white seto'
          style={{
            color: 'aqua',
            fontSize: '20px'
          }}
        >当前点歌列表</span>
      </Divider>
      <table border={1} className='w-600px color-white ml-1rem mb-1rem'>
        <tbody>
          <tr className='text-center border-b-1px'>
            <th colSpan={5}>点歌列表</th>
          </tr>
          <tr className='text-center border-b-1px'>
            <th className='border-r-1px'>歌曲</th>
            <th className='border-r-1px'>歌手</th>
            <th className='border-r-1px'>点歌时间</th>
            <th className='border-r-1px'>持续时间</th>
            <th>点歌用户</th>
          </tr>
          {singList.length > 0 ? singList.map((i, index) => (
            i.expiredTime - new Date().getTime() > 0 && (
              <tr
                className='text-center text-14px border-b-1px'
                key={i + index}
                style={{ color: 'chartreuse' }}
              >
                <th className='border-r-1px'>{i.song}</th>
                <th className='border-r-1px'>{i.singer || '未知'}</th>
                <th className='border-r-1px'>{getFormatTime(new Date(i.currentTime)) || '未知'}</th>
                <th className='border-r-1px'>
                  {` ${getFormatTime(new Date(i.expiredTime))}`}
                </th>
                <th className='flex items-center justify-center'>
                  <Space>
                    <img className='w-20px h-20px rounded' src={i.url} alt='' />
                    {i.name || '未知'}
                  </Space>
                </th>
              </tr>
            )
          ))
            : <tr
              className='text-center text-18px border-b-1px'
              style={{ color: 'chartreuse' }}
            >
              <th className='border-r-1px' colSpan={3}>{'没歌啦,快点歌!'}</th>
            </tr>}
        </tbody>
      </table>
    </Space >
  )
}