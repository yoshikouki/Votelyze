# Votelyze 要件定義

## 概要
Votelyzeは、誰でも簡単に投票を作成し、共有できるWebアプリケーションです。
ユーザーフレンドリーなインターフェイスと柔軟な投票システムを提供し、素早く意見を集めることができます。

## コアコンセプト
- **シンプルさ**: ログインなしでも即座に投票を作成・参加可能
- **手に馴染む体験**: ムダがないインターフェイスと操作性。心地よいフィードバック。高品質なインタラクションとアニメーション
- **アクセシビリティ**: QRコードによる簡単な共有機能

## 機能要件

### 1. 投票マニフェスト作成
#### 未認証ユーザー
- ログインなしで投票マニフェストを作成可能
- 作成した投票マニフェストは1週間後に削除される可能性あり
- 誰でも投票内容を編集可能
- ただし、一度投稿された投票の選択肢は変更不可

#### 認証ユーザー
- 永続的な投票マニフェストの保存
- 投票内容の保護（作成者のみが編集可能）

### 2. 投票機能
- 未認証ユーザーでも投票可能
- 複数の投票モードをサポート
  - 一人一票モード
  - 複数投票モード
  - その他の投票モードも追加予定

### 3. 共有機能
- QRコードによる投票の共有
  - スマートフォンからの簡単アクセス
  - 対面でのスムーズな共有が可能

## 非機能要件

### セキュリティ
- 投票の改ざん防止
- 一度投票された選択肢の不変性の保証

### パフォーマンス
- 高速な投票作成・投票プロセス
- QRコードの即時生成

### データ管理
- 未認証ユーザーの投票データの自動クリーンアップ（1週間後）
- 認証ユーザーのデータの永続化

---

## MVP要件定義

コアコンセプトの検証に必要な最小限の機能を、高品質に実装します。
認証機能と永続化は含まず、In-Memoryなデータストアで実装します。

### 1. 投票マニフェスト作成
- シンプルな投票作成フロー
  - タイトル入力
  - 選択肢の追加（2つ以上）
  - 投票モードの選択（MVPでは「一人一票」と「一人複数票」を実装）
- 作成された投票の編集
  - タイトルの編集が可能
  - 選択肢の追加が可能
  - 一度投稿された選択肢は変更・削除不可
- 投票の有効期限
  - デフォルトで作成から1週間
  - 期限切れ後は結果の閲覧のみ可能

### 2. 投票機能
- シンプルな投票フロー
  - 選択肢の選択（一人一票）
  - 投票の即時反映
  - 投票後の結果表示
- 投票結果の表示
  - 各選択肢の得票数
  - 合計投票数
  - シンプルなグラフ表示

### 3. 共有機能
- QRコードによる共有
  - 投票ページへの直接リンク
  - スマートフォンでの読み取り対応
- URLによる共有
  - シンプルなURL形式
  - SNSでのシェアに対応

## MVP技術要件

### データ管理
- PGLite + DrizzleORM によるデータストア
  - PostgreSQL 互換の In-Memory データベース
  - 型安全なクエリビルダー
  - Edge 環境での動作保証
  - 本番環境への移行を考慮したスキーマ設計
  - マイグレーションによるバージョン管理
- データの一時保存
  - 1週間経過後の自動削除
  - キャッシュの適切な管理

### UI/UX
- レスポンシブデザイン
  - モバイルファースト
  - タブレット・デスクトップ対応
- アクセシビリティ
  - キーボード操作
  - スクリーンリーダー対応
- インタラクション
  - 投票時の適切なフィードバック
  - ローディング状態の表示
  - エラー時の適切なメッセージ

### パフォーマンス
- 高速な初期ロード
- 投票の即時反映
- QRコードの即時生成

## 対象外機能（MVP後の実装）
- ユーザー認証
- 永続的なデータストレージ
- 複数投票モード
- 投票の期限カスタマイズ
- 詳細な投票統計
- 投票の非公開設定

---

## MVP実装タスク

### 1. 基盤実装
- [x] データベース設定
  - [x] PGLite のセットアップ
  - [x] DrizzleORM のセットアップ
  - [x] スキーマの定義（投票、選択肢、投票結果）
  - [x] マイグレーションの仕組み構築
  - [x] Edge 環境での動作確認
- [x] アプリケーションの基本設定
  - [x] Next.js プロジェクトのセットアップ
  - [x] TypeScript の設定
  - [x] Biome の設定
  - [x] テスト環境の構築

### 2. UI実装
- [x] デザインシステムの構築
  - [x] カラーパレット、タイポグラフィの定義
  - [x] 基本コンポーネントの実装（Button, Input, Card など）
  - [x] アニメーションの基本設定
- [x] レイアウト実装
  - [x] レスポンシブレイアウトの基本設定
  - [x] ヘッダー、フッターの実装
  - [x] エラー表示、ローディング表示の実装

### 3. 投票機能の実装
- [ ] 投票作成フロー
  - [ ] 投票作成フォームの実装
  - [ ] 選択肢の動的追加機能
  - [ ] バリデーションの実装
- [ ] 投票ページ
  - [ ] 投票UIの実装
  - [ ] 結果表示の実装（グラフ表示含む）
  - [ ] 投票後のフィードバック実装

### 4. 共有機能の実装
- [ ] QRコード生成
  - [ ] QRコード生成ライブラリの導入
  - [ ] QRコード表示UIの実装
- [ ] URL共有
  - [ ] シェアボタンの実装
  - [ ] SNSシェアリンクの生成

### 5. アクセシビリティ対応
- [ ] キーボード操作
  - [ ] フォーカス管理の実装
  - [ ] キーボードショートカットの実装
- [ ] スクリーンリーダー対応
  - [ ] 適切なARIAラベルの設定
  - [ ] フォーム要素のラベリング

### 6. テスト実装
- [ ] ユニットテスト
  - [ ] Repository のテスト
  - [ ] ユーティリティ関数のテスト
- [ ] インテグレーションテスト
  - [ ] 投票フローのテスト
  - [ ] 共有機能のテスト
- [ ] E2Eテスト
  - [ ] 基本的な投票シナリオのテスト

### 7. パフォーマンス最適化
- [ ] 初期ロードの最適化
  - [ ] コンポーネントの適切な分割
  - [ ] 画像の最適化
- [ ] インタラクションの最適化
  - [ ] 投票時のレスポンス改善
  - [ ] アニメーションのパフォーマンス調整
