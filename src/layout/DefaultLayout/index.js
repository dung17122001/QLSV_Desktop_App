import { memo } from 'react';
import classNames from 'classnames';

import Menu from './Menu';
import Header from './Header';

const cx = classNames;
function DefaultLayout({ children }) {
    return (
        <div className={cx('w-full h-screen  flex flex-row')}>
            <Menu />
            <div className={cx('w-full h-full overflow-hidden relative')}>
                <Header />
                {children}
            </div>
        </div>
    );
}

export default memo(DefaultLayout);
