import { memo } from 'react';
import classNames from 'classnames';

import Menu from './Menu';
import Header from './Header';

const cx = classNames;
function DefaultLayout({ children }) {
    return (
        <div className={cx('w-full h-screen  flex flex-row')}>
            <div className={cx('w-full h-full overflow-hidden relative')}>
                <Header />
                <div className="w-full flex">
                    <div className="h-screen w-1/12 mr-10">
                        <Menu />
                    </div>
                    <div className=" w-11/12"> {children}</div>
                </div>
            </div>
        </div>
    );
}

export default memo(DefaultLayout);
